-- ====================================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON USER SIGNUP
-- ====================================================================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT;
  user_phone TEXT;
  user_role_val public.user_role;
BEGIN
  -- Extract raw user metadata passed during supabase.auth.signUp()
  user_full_name := COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1));
  user_phone := new.raw_user_meta_data->>'phone';
  
  -- Resolve role, fallback to 'student' if unspecified
  BEGIN
    user_role_val := (new.raw_user_meta_data->>'role')::public.user_role;
  EXCEPTION WHEN OTHERS THEN
    user_role_val := 'student'::public.user_role;
  END;

  -- 1. Insert into public.profiles
  INSERT INTO public.profiles (id, full_name, role, phone, status)
  VALUES (new.id, user_full_name, user_role_val, user_phone, 'active')
  ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      role = EXCLUDED.role,
      phone = EXCLUDED.phone;

  -- 2. Link to role-specific tables
  IF user_role_val = 'parent' THEN
    INSERT INTO public.parents (profile_id)
    VALUES (new.id)
    ON CONFLICT DO NOTHING;
  ELSIF user_role_val = 'teacher' OR user_role_val = 'admin' OR user_role_val = 'principal' OR user_role_val = 'vice_principal' OR user_role_val = 'bursar' THEN
    INSERT INTO public.staff (profile_id, staff_id, department)
    VALUES (new.id, 'STF-' || UPPER(SUBSTRING(new.id::text FROM 1 FOR 6)), 'General')
    ON CONFLICT DO NOTHING;
  ELSIF user_role_val = 'student' THEN
    INSERT INTO public.students (profile_id, admission_no)
    VALUES (new.id, 'GGS/' || TO_CHAR(NOW(), 'YYYY') || '/' || UPPER(SUBSTRING(new.id::text FROM 1 FOR 4)))
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger firing immediately after an auth.users record is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
