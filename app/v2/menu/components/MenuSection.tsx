import { MenuGroup, MenuOption } from "../types"

type MenuSectionProps = {
  menuGroup: MenuGroup
  onOptionClick: (menuGroup: MenuGroup, option: MenuOption) => void
}

export default function MenuSection({ menuGroup, onOptionClick }: MenuSectionProps) {
  return (
    <div className="py-4">
      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">{menuGroup.name}</h4>
      <nav className="space-y-1">
        {menuGroup.options.map((option, index) => (
          <a
            key={index}
            href="#"
            onClick={() => onOptionClick(menuGroup, option)}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${option.active
                ? 'bg-gray-50 text-gray-700 border border-gray-200'
                : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            <option.icon className="w-4 h-4" />
            <span className="flex-1">{option.name}</span>
            {option.badge && (
              <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {option.badge}
              </span>
            )}
          </a>
        ))}
      </nav>
    </div>
  )
}