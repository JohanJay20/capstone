import { useState } from 'react';
import { changePassword } from '../api';

const UserInfo = ({ user }) => {
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== rePassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await changePassword(newPassword);
      setMessage("✅ Password updated successfully.");
      setNewPassword('');
      setRePassword('');
    } catch (err) {
      console.error("Password update failed:", err);
      setMessage(err.response?.data?.error || "❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form card card-body col-xl-8">
      <h4 className="text-primary">User Information</h4>
      <form>
        {/* User info */}
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>First Name</label>
            <input type="text" value={user?.givenName || ""} className="form-control" disabled />
          </div>
          <div className="form-group col-md-6">
            <label>Last Name</label>
            <input type="text" value={user?.familyName || ""} className="form-control" disabled />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label>Email</label>
            <input type="email" value={user?.email || ""} className="form-control" disabled />
          </div>
          <div className="form-group col-md-6">
            <label>User Name</label>
            <input type="text" value={user?.displayName || ""} className="form-control" disabled />
          </div>
        </div>

        {/* Password section */}
        <div className="form-row mt-4">
          <div className="form-group col-md-6">
            <label>New Password</label>
            <input
              type="password"
              placeholder="New Password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
        </div>

        {message && <p className="mt-2">{message}</p>}

        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfo;
