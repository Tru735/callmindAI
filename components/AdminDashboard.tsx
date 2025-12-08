import React, { useEffect, useState } from 'react';
import { X, Download, Trash2, Database, CloudLightning, Wifi } from 'lucide-react';
import { getWaitlist, clearWaitlist } from '../services/waitlist';
import { Button } from './ui/Button';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    const data = getWaitlist();
    // Sort by newest first
    setUsers(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  const handleDownloadCSV = () => {
    if (users.length === 0) return;

    const headers = ['ID', 'Email', 'Use Case', 'Willingness To Pay', 'Source', 'Synced?', 'Date'];
    const csvContent = [
      headers.join(','),
      ...users.map(u => [
        u.id, 
        u.email, 
        u.useCase || 'N/A', 
        u.willingnessToPay || 'N/A', 
        u.source,
        u.syncedToFormspree ? 'Yes' : 'No',
        u.createdAt
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `waitlist_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to delete all local waitlist data? This cannot be undone.')) {
      clearWaitlist();
      setUsers([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 p-2 rounded-lg border border-green-500/20">
              <CloudLightning className="text-green-400 w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Live Database</h2>
                <span className="text-[10px] bg-green-500 text-black px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">Connected</span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Sending to Formspree & backing up locally
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
          <div className="text-sm text-slate-400">
            Local Backup Count: <span className="text-white font-mono font-bold">{users.length}</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={handleClearData} disabled={users.length === 0}>
              <Trash2 size={14} className="mr-2" /> Clear Backup
            </Button>
            <Button size="sm" onClick={handleDownloadCSV} disabled={users.length === 0}>
              <Download size={14} className="mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-950 text-slate-200 sticky top-0">
              <tr>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Use Case</th>
                <th className="p-4 font-medium text-center">Willingness ($)</th>
                <th className="p-4 font-medium text-center">Synced</th>
                <th className="p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-500">
                    No signups yet. Try adding one from the landing page!
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-white font-medium">{user.email}</td>
                    <td className="p-4">
                      {user.useCase ? (
                        <span className="bg-brand-900/30 text-brand-300 px-2 py-1 rounded text-xs border border-brand-500/20 capitalize">
                          {user.useCase}
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {user.willingnessToPay ? (
                        <span className={`font-bold ${user.willingnessToPay >= 4 ? 'text-green-400' : 'text-yellow-400'}`}>
                          {user.willingnessToPay}/5
                        </span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                       {user.syncedToFormspree ? (
                         <span className="text-green-400 text-xs">Yes</span>
                       ) : (
                         <span className="text-slate-600 text-xs">No</span>
                       )}
                    </td>
                    <td className="p-4 font-mono text-xs">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};