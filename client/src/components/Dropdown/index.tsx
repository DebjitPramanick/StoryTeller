import React from 'react'

interface ItemType {
    label: string;
    onClick: any;
    icon?: any
}

interface DropdownProps {
    items: ItemType[],
    open: boolean
}

const DropDown: React.FC<DropdownProps> = ({
    items,
    open
}) => {
    return (
        <div id="dropdown" className={`z-10 w-44 bg-white border rounded divide-y divide-gray-100 shadow-lg absolute right-0 top-10 ${!open ? 'hidden' : 'visible'}`}>
            <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdownDefault">
                {items.map((item: ItemType) => (
                    <li onClick={() => item.onClick()} className="flex items-center gap-4">
                        {item.icon && item.icon}
                        <p className="w-full block py-2 px-4 hover:bg-gray-100">{item.label}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DropDown