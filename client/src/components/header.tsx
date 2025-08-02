import '@/globals.css'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '@/context/auth';
import Logged from './logged';
import { userManager } from '@/lib/user';
import { isNotEmpty } from '@/util/util';
import { chainManager } from '@/lib/chain';
import { contractMgr } from '@/game/data_mgr/contract_mgr';

export default function Header() {
  const navigate = useNavigate();
  const { login } = useAuth();  // 在这里调用 useAuth
  const haveUser = userManager.size() > 0;

  useEffect(() => {
    const account = localStorage.getItem('account');
    const user = isNotEmpty(account) ? userManager.getUserById(account) : undefined;
    if (user) {
      chainManager.generateWallet(user.mnemonic).then((wallet) => {
        login(user, user.mnemonic, wallet)
        contractMgr.reload(wallet.privateKey)
        navigate('/room_list');
        return
      })
    }

    navigate("/login");
  }, []);

  // bg-gray-400
  return (
    <header className="px-2 py-2 text-[var(--text)] bg-transparent">
      <div className="flex justify-end items-center">
        {/* 右侧 */}
        <div>
          {haveUser ? (
            <Logged />
          ) : (
            <Link to="/login">
              <span className="cursor-pointer hover:text-indigo-300">登录</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
