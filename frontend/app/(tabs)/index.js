import { UserProvider } from '../components';
import { HomePage } from '../routes';

export default function Tab() {
  return (
    <UserProvider>
      <HomePage />
    </UserProvider>
  );
}