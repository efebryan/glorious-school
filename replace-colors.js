const fs = require('fs');
const path = require('path');

const files = [
  "src/lib/admin-config.ts",
  "src/components/admin/AdminSidebar.tsx",
  "src/components/admin/AdminTopBar.tsx",
  "src/components/admin/AdminShell.tsx",
  "src/components/admin/AdminNotificationDropdown.tsx",
  "src/app/login/page.tsx",
  "src/app/admin/reports/page.tsx",
  "src/app/admin/settings/page.tsx",
  "src/app/admin/users/page.tsx",
  "src/app/admin/users/roles/page.tsx",
  "src/app/admin/academics/page.tsx",
  "src/app/admin/academics/calendar/page.tsx",
  "src/app/admin/overview/page.tsx",
  "src/app/admin/finance/page.tsx",
  "src/app/admin/communications/page.tsx",
  "src/app/admin/communications/inbox/page.tsx",
  "src/app/admin/cms/page.tsx",
  "src/app/admin/cms/events/page.tsx",
];

for (const file of files) {
  const p = path.join(process.cwd(), file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');

    // Dark theme backgrounds
    content = content.replace(/#020617/g, '#0f2316');
    content = content.replace(/indigo-950/g, 'brand-green-800');
    
    // Core Indigo replacements
    content = content.replace(/indigo-700/g, 'brand-green-700');
    content = content.replace(/indigo-600\/15/g, 'brand-green-600/15');
    content = content.replace(/indigo-600\/20/g, 'brand-green-600/20');
    content = content.replace(/indigo-600/g, 'brand-green');
    
    // Specific elements designed to be active/yellow
    content = content.replace(/text-indigo-400/g, 'text-brand-yellow');
    content = content.replace(/bg-indigo-500/g, 'bg-brand-yellow');
    
    // Fallback Indigo variants
    content = content.replace(/indigo-500\/30/g, 'brand-green-500/30');
    content = content.replace(/indigo-500/g, 'brand-green-500');
    content = content.replace(/indigo-400/g, 'brand-yellow-500'); 
    content = content.replace(/indigo-300/g, 'brand-green-200'); // mapped to 200 as 300 doesn't exist
    content = content.replace(/indigo-200/g, 'brand-green-200');
    content = content.replace(/indigo-100/g, 'brand-green-100');
    content = content.replace(/indigo-50/g, 'brand-green-50');

    fs.writeFileSync(p, content);
    console.log(`Updated ${file}`);
  }
}
console.log("Color replacement complete.");
