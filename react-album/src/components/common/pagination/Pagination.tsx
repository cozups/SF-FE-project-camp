import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui';
import { pageAtom, totalImageNumAtom } from '@/store';
import { useAtom } from 'jotai';
import { useLocation } from 'react-router-dom';

function PaginationFooter() {
  const { pathname } = useLocation();

  const [page, setPage] = useAtom(pageAtom);
  const perPage = 30;
  const [total] = useAtom(totalImageNumAtom);
  const totalPage = Math.ceil(total / perPage);

  const onClickPageNumber = (type: string, num?: number) => {
    if (type === 'prev') {
      if (page === 1) {
        setPage(1);
      } else {
        setPage((prev) => prev - 1);
      }
    }
    if (type === 'next') {
      if (page === totalPage) {
        setPage(totalPage);
      } else {
        setPage((prev) => prev + 1);
      }
    }
    if (type === 'num' && num) {
      setPage(num);
    }
  };

  const pageList = Array.from({ length: 10 }, (_, index) => {
    return Math.floor((page - 1) / 10) * 10 + index + 1;
  });

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={() => onClickPageNumber('prev')}>
          <PaginationPrevious href={`${pathname}`} />
        </PaginationItem>
        {pageList.map((item) => (
          <PaginationItem
            key={'page' + item}
            onClick={() => onClickPageNumber('num', item)}
            className={item === page ? 'bg-blue-200 rounded' : ''}
          >
            <PaginationLink href={`${pathname}`}>{item}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem onClick={() => onClickPageNumber('next')}>
          <PaginationNext href={`${pathname}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { PaginationFooter };
