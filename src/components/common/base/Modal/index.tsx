'use client';
import { useRouter } from '@/navigation';
import { cn } from '@/utils/helper/tailwind_cn';
import { XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import Button from '../../base/Button';
import style from './index.module.css';

type PropTypes = {
  id: string;
  onClose?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disableIcon?: boolean;
  grandClassName?: string;
  nestedClassName?: string;
};

const Modal = ({
  id,
  onClose = () => {},
  children,
  icon,
  disableIcon = false,
  grandClassName,
  nestedClassName,
}: PropTypes) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams.get(`${id}modal`);

  const updateUrlParams = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(`${id}modal`);
    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  }, [searchParams, router, id]);

  const closeModal = useCallback(() => {
    modalRef.current?.close();
    updateUrlParams();
    onClose();
  }, [updateUrlParams, onClose]);

  const handleBackdropClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === modalRef.current) {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      modalElement.addEventListener('close', closeModal);
      modalElement.addEventListener('click', handleBackdropClick);

      if (showModal === 'open') {
        if (!modalElement.open) {
          modalElement.showModal();
        }
      } else {
        modalElement.close();
      }
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener('close', closeModal);
        modalElement.removeEventListener('click', handleBackdropClick);
      }
    };
  }, [showModal, onClose, handleBackdropClick, closeModal]);

  if (!showModal) {
    return null;
  }

  return (
    <dialog ref={modalRef} className={cn(style.modal, grandClassName)}>
      <div className={nestedClassName}>
        {!disableIcon && (
          <Button
            variant="default"
            onClick={closeModal}
            className="block p-0 ltr:!self-end rtl:!self-start"
          >
            <span aria-hidden="true">
              {icon ? <> {icon}</> : <XCircle size={20} strokeWidth={1.25} />}
            </span>

            <span className="sr-only ">close modal</span>
          </Button>
        )}

        <div>{children}</div>
      </div>
    </dialog>
  );
};

export default memo(Modal);
