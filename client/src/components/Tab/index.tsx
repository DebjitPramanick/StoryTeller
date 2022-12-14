import React from 'react'

interface TabProps {
    tabs: any[],
    currentTab: number,
    selectTab: (val: number) => void,
    align?: 'left' | 'right' | 'centre'
}

const Tab: React.FC<TabProps> = ({
    tabs,
    currentTab,
    selectTab,
    align='centre'
}) => {
    return (
        <div className="border-b border-gray-200 mx-auto">
            <ul className={`flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 
            ${align === 'left' ? 'justify-start' : align === 'centre' ? 'justify-center' : 'justify-end'}`}>
                {tabs.map((tab: any, index: number) => (
                    <li className="mr-2" onClick={() => selectTab(index)}>
                        <p className={`inline-flex items-center gap-2 p-2 rounded-t-lg border-b-2 group cursor-pointer ${currentTab === index ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}>
                            {tab.icon ? tab.icon : null}
                            {tab.title}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tab