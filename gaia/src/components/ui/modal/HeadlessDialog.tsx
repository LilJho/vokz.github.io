import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment } from "react";
import { HiX } from "react-icons/hi";
import { Button } from "../button";

interface IModalProps {
  isOpen: boolean;
  toggle: () => void;
  children?: React.ReactNode;
  title?: any;
  className?: string;
  closeButton?: boolean;
  maxWidth?: string;
  titleSize?: string;
  trigger: JSX.Element;
  titleColor?: string;
  backdropBlur?: string;
}

const HeadlessDialog = ({
  isOpen,
  toggle,
  children,
  title = "",
  className = "",
  closeButton = false,
  maxWidth = "max-w-2xl",
  titleSize = "text-xl",
  titleColor = "text-gray-800",
  trigger,
  backdropBlur = "bg-gray-400/70",
}: IModalProps) => {
  return (
    <>
      {trigger}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toggle}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`fixed inset-0 z-40 ${backdropBlur} backdrop-blur-sm transition-all duration-100 pointer-events-auto`}
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto z-50 pointer-events-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-0 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Dialog.Panel
                  className={`${className} ${maxWidth} w-full flex flex-col transform  rounded-lg bg-white border p-8 text-left align-middle shadow-xl transition-all`}
                >
                  {(title !== "" || closeButton) && (
                    <div className="flex items-center justify-between pb-4">
                      {title !== "" && (
                        <Dialog.Title
                          as="h3"
                          className={`${titleSize} font-semibold leading-6 ${titleColor}`}
                        >
                          {title}
                        </Dialog.Title>
                      )}
                      {closeButton && (
                        <Button variant="unstyled" size="square" onClick={toggle}>
                          <HiX className="w-6 h-6 text-gray-400" />
                        </Button>
                      )}
                    </div>
                  )}

                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default HeadlessDialog;
