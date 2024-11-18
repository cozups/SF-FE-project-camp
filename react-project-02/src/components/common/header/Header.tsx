import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  Separator,
} from '@/components/ui';
import { BookMarked } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const onClickBookmarkButton = () => {
    navigate('/bookmark');
  };
  return (
    <header className={styles.header}>
      <div className={styles[`header__logo-box`]}>
        <Link to="/">
          <img
            src="/src/assets/logo.svg"
            alt=""
            className={styles[`header__logo-box__logo`]}
          />
        </Link>
      </div>
      <div className={styles[`header__user-box`]}>
        {/* 북마크 버튼 */}
        <Button variant="secondary" onClick={onClickBookmarkButton}>
          <BookMarked className="w-4 h-4" />
          북마크
        </Button>
        <Separator orientation="vertical" className="h-10 mx-1" />
        {/* 아바타 */}
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {/* 유저 닉네임 & 이메일 */}
        <div className="flex items-center gap-2">
          <small className="text-base font-medium leading-none">Miso |</small>
          <small className="text-base font-medium leading-none">
            kimms9725@naver.com
          </small>
        </div>
      </div>
    </header>
  );
}

export { Header };
