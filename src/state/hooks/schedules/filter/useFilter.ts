import { useRecoilValue } from "recoil";
import { schedulesFilterState } from "../../../atom";

export const useFilter = () => {
  return useRecoilValue(schedulesFilterState);
};
