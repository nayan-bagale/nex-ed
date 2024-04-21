'use client'

import { useRecoilValue } from "recoil"
import { subjects } from "../Store/class"

const useSubject = (id: string) => {
    const subjects_ = useRecoilValue(subjects);
    return subjects_.find((s) => s?.id === id);
}

export default useSubject