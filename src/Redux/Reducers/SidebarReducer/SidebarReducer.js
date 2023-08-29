import { IS_ACTIVE, NOT_ACTIVE } from "./../../Constants/SidebarConstant";

export const sideBarReucer = (state = { isSidebarActive: false }, action) => {
  switch (action.type) {
    case IS_ACTIVE:
      return { isSidebarActive: true };
    case NOT_ACTIVE:
      return { isSidebarActive: false };

    default:
      return state;
  }
};
