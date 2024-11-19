import {useState} from "react";

type useSelectionHook = () => [(id: string) => void, (id: string) => void, (id: string) => boolean, string[]];

const useSelection: useSelectionHook = () => {
    const [selection, setSelection] = useState<string[]>([]);

    const isSelected = (id: string): boolean => {
        return selection.includes(id);
    }

    const select = (id: string): void => {
        if (!isSelected(id)) setSelection([...selection, id]);
    }

    const deselect = (id: string): void => {
        if (isSelected(id)) setSelection(selection.filter(_id => _id !== id));
    }

    return [select, deselect, isSelected, selection];
}

export default useSelection;
