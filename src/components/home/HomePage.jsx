import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // Adjust the import path as necessary
import WelcomeHeader from './WelcomeHeader';

function HomePage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const user = supabase.auth.user();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();
        if (data) {
          setUsername(data.username);
        }
      }
    };

    fetchUsername();
  }, []);

  return (
    <div>
      <WelcomeHeader username={username} />
      {/* ...existing code... */}
    </div>
  );
}

export default HomePage;
