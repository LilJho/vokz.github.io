import userStore from '@/lib/store/userStore';

const PatientsName = () => {
    const user = userStore((state) => state.user);
    return (
        <h3 className="text-xl font-semibold max-w-max">{user?.first_name} {user?.last_name}'s Daily Status</h3>
    )
}

export default PatientsName