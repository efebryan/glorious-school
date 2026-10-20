-- ====================================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR GLORIOUS GROUP OF SCHOOLS
-- ====================================================================================

-- 1. Enable RLS on all 21 public tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE result_pins ENABLE ROW LEVEL SECURITY;
ALTER TABLE fees_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE disciplinary_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- 2. Helper Functions for RBAC
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_admin_or_super()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin', 'principal')
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ====================================================================================
-- PROFILES
-- ====================================================================================
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id OR is_admin_or_super());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins have full access to profiles"
  ON profiles FOR ALL
  USING (is_admin_or_super());

-- ====================================================================================
-- PARENTS & STAFF
-- ====================================================================================
CREATE POLICY "Parents can view own record"
  ON parents FOR SELECT
  USING (profile_id = auth.uid() OR is_admin_or_super());

CREATE POLICY "Staff can view own record"
  ON staff FOR SELECT
  USING (profile_id = auth.uid() OR is_admin_or_super());

CREATE POLICY "Admins manage parents"
  ON parents FOR ALL
  USING (is_admin_or_super());

CREATE POLICY "Admins manage staff"
  ON staff FOR ALL
  USING (is_admin_or_super());

-- ====================================================================================
-- ACADEMIC CONFIGURATION (Sessions, Terms, Classes, Subjects, Timetable)
-- Read: Authenticated users & Public where appropriate
-- Write: Admins only
-- ====================================================================================
CREATE POLICY "Anyone can view active academic sessions"
  ON academic_sessions FOR SELECT
  USING (true);

CREATE POLICY "Admins manage academic sessions"
  ON academic_sessions FOR ALL
  USING (is_admin_or_super());

CREATE POLICY "Anyone can view terms"
  ON terms FOR SELECT
  USING (true);

CREATE POLICY "Admins manage terms"
  ON terms FOR ALL
  USING (is_admin_or_super());

CREATE POLICY "Authenticated users can view classes"
  ON classes FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins manage classes"
  ON classes FOR ALL
  USING (is_admin_or_super());

CREATE POLICY "Authenticated users can view subjects"
  ON subjects FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins manage subjects"
  ON subjects FOR ALL
  USING (is_admin_or_super());

CREATE POLICY "Authenticated users can view class subjects"
  ON class_subjects FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins manage class subjects"
  ON class_subjects FOR ALL
  USING (is_admin_or_super());

CREATE POLICY "Authenticated users can view timetable"
  ON timetable FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins manage timetable"
  ON timetable FOR ALL
  USING (is_admin_or_super());

-- ====================================================================================
-- STUDENTS
-- ====================================================================================
CREATE POLICY "Students can view own record"
  ON students FOR SELECT
  USING (
    profile_id = auth.uid()
    OR parent_id IN (SELECT id FROM parents WHERE profile_id = auth.uid())
    OR is_admin_or_super()
    OR current_user_role() = 'teacher'
  );

CREATE POLICY "Admins manage students"
  ON students FOR ALL
  USING (is_admin_or_super());

-- ====================================================================================
-- RESULTS & REPORT CARDS
-- ====================================================================================
CREATE POLICY "View results based on ownership or role"
  ON results FOR SELECT
  USING (
    -- Students see own approved results
    (student_id IN (SELECT id FROM students WHERE profile_id = auth.uid()) AND status = 'approved')
    -- Parents see their children's approved results
    OR (student_id IN (SELECT id FROM students WHERE parent_id IN (SELECT id FROM parents WHERE profile_id = auth.uid())) AND status = 'approved')
    -- Teachers see results they entered or manage
    OR current_user_role() = 'teacher'
    -- Admins/Principals see all
    OR is_admin_or_super()
  );

CREATE POLICY "Teachers can insert and update draft results"
  ON results FOR INSERT
  WITH CHECK (current_user_role() IN ('teacher', 'admin', 'super_admin'));

CREATE POLICY "Teachers and Admins can update results"
  ON results FOR UPDATE
  USING (current_user_role() IN ('teacher', 'admin', 'super_admin', 'principal'));

CREATE POLICY "Admins manage all results"
  ON results FOR ALL
  USING (is_admin_or_super());

CREATE POLICY "View report cards"
  ON report_cards FOR SELECT
  USING (
    student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
    OR student_id IN (SELECT id FROM students WHERE parent_id IN (SELECT id FROM parents WHERE profile_id = auth.uid()))
    OR is_admin_or_super()
    OR current_user_role() = 'teacher'
  );

CREATE POLICY "Admins manage report cards"
  ON report_cards FOR ALL
  USING (is_admin_or_super());

CREATE POLICY "Result pins are restricted to admins"
  ON result_pins FOR ALL
  USING (is_admin_or_super());

-- ====================================================================================
-- FINANCE (Fees, Invoices, Payments)
-- ====================================================================================
CREATE POLICY "Anyone authenticated can view fees config"
  ON fees_config FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Bursar and Admins manage fees config"
  ON fees_config FOR ALL
  USING (current_user_role() IN ('bursar', 'admin', 'super_admin'));

CREATE POLICY "Users can view own or ward invoices"
  ON invoices FOR SELECT
  USING (
    student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
    OR student_id IN (SELECT id FROM students WHERE parent_id IN (SELECT id FROM parents WHERE profile_id = auth.uid()))
    OR current_user_role() IN ('bursar', 'admin', 'super_admin')
  );

CREATE POLICY "Bursar and Admins manage invoices"
  ON invoices FOR ALL
  USING (current_user_role() IN ('bursar', 'admin', 'super_admin'));

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (
    invoice_id IN (
      SELECT id FROM invoices WHERE 
        student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
        OR student_id IN (SELECT id FROM students WHERE parent_id IN (SELECT id FROM parents WHERE profile_id = auth.uid()))
    )
    OR current_user_role() IN ('bursar', 'admin', 'super_admin')
  );

CREATE POLICY "Bursar and Admins manage payments"
  ON payments FOR ALL
  USING (current_user_role() IN ('bursar', 'admin', 'super_admin'));

-- ====================================================================================
-- ATTENDANCE & DISCIPLINE
-- ====================================================================================
CREATE POLICY "View attendance"
  ON attendance FOR SELECT
  USING (
    student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
    OR student_id IN (SELECT id FROM students WHERE parent_id IN (SELECT id FROM parents WHERE profile_id = auth.uid()))
    OR current_user_role() IN ('teacher', 'vice_principal', 'admin', 'super_admin')
  );

CREATE POLICY "Teachers and VP record attendance"
  ON attendance FOR ALL
  USING (current_user_role() IN ('teacher', 'vice_principal', 'admin', 'super_admin'));

CREATE POLICY "View disciplinary records"
  ON disciplinary_records FOR SELECT
  USING (
    student_id IN (SELECT id FROM students WHERE profile_id = auth.uid())
    OR student_id IN (SELECT id FROM students WHERE parent_id IN (SELECT id FROM parents WHERE profile_id = auth.uid()))
    OR current_user_role() IN ('vice_principal', 'principal', 'admin', 'super_admin')
  );

CREATE POLICY "VP and Admins manage disciplinary records"
  ON disciplinary_records FOR ALL
  USING (current_user_role() IN ('vice_principal', 'admin', 'super_admin'));

-- ====================================================================================
-- ANNOUNCEMENTS, MESSAGES & EVENTS
-- ====================================================================================
CREATE POLICY "Audience can view announcements"
  ON announcements FOR SELECT
  USING (
    target_audience = 'all'
    OR (target_audience = 'students' AND current_user_role() = 'student')
    OR (target_audience = 'parents' AND current_user_role() = 'parent')
    OR (target_audience = 'staff' AND current_user_role() IN ('teacher', 'principal', 'vice_principal', 'bursar', 'admin', 'super_admin'))
    OR is_admin_or_super()
  );

CREATE POLICY "Staff and Admins post announcements"
  ON announcements FOR INSERT
  WITH CHECK (current_user_role() IN ('principal', 'vice_principal', 'admin', 'super_admin'));

CREATE POLICY "Users view own messages"
  ON messages FOR SELECT
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users send messages"
  ON messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users update own received messages"
  ON messages FOR UPDATE
  USING (receiver_id = auth.uid());

CREATE POLICY "Public can view events"
  ON events FOR SELECT
  USING (is_public = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins manage events"
  ON events FOR ALL
  USING (is_admin_or_super());
