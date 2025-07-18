import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://nemkluujjuopkqgscvdn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lbWtsdXVqanVvcGtxZ3NjdmRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NDk2OTQsImV4cCI6MjA2NzIyNTY5NH0.siJI6J9V-4ZkFSVH4Xb31-Sw2hiJrlaU647iUNU7Cwk";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

async function debugAdmin() {
  try {
    console.log('🔍 Debugging Admin Panel Access...\n');

    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error('❌ Session error:', sessionError);
      return;
    }

    if (!session) {
      console.log('❌ No active session found. Please log in first.');
      return;
    }

    console.log('✅ Session found');
    console.log('👤 Current user ID:', session.user.id);
    console.log('📧 User email:', session.user.email);
    console.log('');

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (profileError) {
      console.log('❌ Profile not found or error:', profileError.message);
      console.log('');
      console.log('🔧 Solutions:');
      console.log('1. Check if your user ID exists in the profiles table');
      console.log('2. Create a profile for your user if it doesn\'t exist');
      console.log('3. Set approved = true for your profile');
      return;
    }

    console.log('✅ Profile found:');
    console.log('📝 Display name:', profile.display_name);
    console.log('👑 Role:', profile.role);
    console.log('✅ Approved:', profile.approved);
    console.log('📅 Created:', profile.created_at);
    console.log('');

    if (!profile.approved) {
      console.log('❌ ISSUE: Profile is not approved!');
      console.log('');
      console.log('🔧 To fix this, run this SQL in your Supabase dashboard:');
      console.log(`UPDATE profiles SET approved = true WHERE user_id = '${session.user.id}';`);
    } else {
      console.log('✅ Profile is approved - admin panel should work!');
      console.log('');
      console.log('🔍 If you\'re still seeing "awaiting approval", try:');
      console.log('1. Refresh the page');
      console.log('2. Clear browser cache');
      console.log('3. Sign out and sign back in');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugAdmin(); 