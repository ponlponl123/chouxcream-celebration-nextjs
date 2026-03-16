import { SmoothCursor, SmoothCursorProps } from "@/components/ui/smooth-cursor";
import React from "react";

const CustomCursorContext = React.createContext<{
  active: boolean;
  cursor: React.ReactNode;
  force_rotation?: SmoothCursorProps["force_rotation"];
  springConfig: SmoothCursorProps["springConfig"];
  setCustomCursor: React.Dispatch<
    React.SetStateAction<React.ReactNode | undefined>
  >;
  setCursorActive: React.Dispatch<React.SetStateAction<boolean>>;
  setForceRotation: React.Dispatch<
    React.SetStateAction<SmoothCursorProps["force_rotation"]>
  >;
  setSpringConfig: React.Dispatch<
    React.SetStateAction<SmoothCursorProps["springConfig"]>
  >;
}>({
  active: true,
  cursor: undefined,
  force_rotation: undefined,
  springConfig: undefined,
  setCustomCursor: () => {},
  setCursorActive: () => {},
  setForceRotation: () => {},
  setSpringConfig: () => {},
});

export const useCustomCursor = () => React.useContext(CustomCursorContext);

export const CustomCursorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cursorActive, setCursorActive] = React.useState(true);
  const [customCursor, setCustomCursor] = React.useState<
    React.ReactNode | undefined
  >(undefined);
  const [springConfig, setSpringConfig] =
    React.useState<SmoothCursorProps["springConfig"]>(undefined);
  const [force_rotation, setForceRotation] =
    React.useState<SmoothCursorProps["force_rotation"]>(undefined);
  return (
    <CustomCursorContext.Provider
      value={{
        active: cursorActive,
        setCursorActive,
        cursor: customCursor,
        setCustomCursor,
        springConfig,
        setSpringConfig,
        force_rotation,
        setForceRotation,
      }}
    >
      <SmoothCursor
        cursor={cursorActive ? (customCursor ?? undefined) : <></>}
        springConfig={springConfig}
        force_rotation={force_rotation}
      />
      {children}
    </CustomCursorContext.Provider>
  );
};
