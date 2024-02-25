import clsx from 'clsx';
import Select from 'react-select';

export default function Selector({ option, options, setOption }) {
  return (
    <Select
      placeholder={'Выберите...'}
      isClearable={true}
      options={options}
      value={option}
      onChange={selected => setOption(selected)}
      unstyled
      classNames={{
        control: () =>
          'px-4 md:w-80 h-12 w-full flex items-center shadow-md border border-none rounded bg-surface gap-2',
        placeholder: () => 'text-gray',
        indicatorsContainer: () => 'gap-4',
        dropdownIndicator: () => 'text-accent cursor-pointer',
        clearIndicator: () => 'text-accent cursor-pointer',
        indicatorSeparator: () => 'bg-accent my-3',
        menu: () => 'p-2 mt-2 bg-surface rounded shadow-md',
        option: ({ isFocused, isSelected }) =>
          clsx(
            'hover:cursor-pointer px-3 py-2 rounded',
            isSelected
              ? 'bg-accent text-surface'
              : isFocused
              ? 'bg-grayLight'
              : ''
          ),
      }}
    />
  );
}
