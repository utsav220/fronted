import { useEffect, useState } from "react";
import { getUsersList } from "../service/users.service";

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsersList();
                console.log("userData:", data);
                setUsers(data);
            } catch (error) {
                if (error.response?.status === 401) {
                    setError("Please login to view users");
                } else {
                    setError(error.response?.data?.message || "Failed to fetch users");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading users...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Users List</h2>
            <ul className="space-y-3">
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                            <p className="text-lg font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UsersList;
