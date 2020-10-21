import React, { FC, useState, ChangeEvent, ReactElement, useEffect,KeyboardEvent,useRef } from 'react'
import classnames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hook/useDebounce'

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
type ExcludeProps = 'onChange' | 'onSelect'
export interface AutoCompleteProps extends Omit<InputProps, ExcludeProps> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const debouncedValue = useDebounce(inputValue, 500)
  
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        console.log('triggered')
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debouncedValue,fetchSuggestions])
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const highlight = (index:number)=> {
    if(index<0) {index=0}
    if(index>=suggestions.length) {
      index = suggestions.length -1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        // enter 键
        if(suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break;
      case 38:
        // ⬆️ 键
        highlight(highlightIndex - 1)
        break;
      case 40:
        // ⬇️ 键
        highlight(highlightIndex +1)
        break;
      case 27:
        // esc键
        setSuggestions([])
        break;
      default:
        break;
    }
  }
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classnames('suggestion-item', {
            'item-highlighted': index === highlightIndex
          })
          return (
            <li key={index} onClick={() => handleSelect(item)} className={cnames}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="beryl-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
        placeholder="请输入。。。"
      />
      {loading && <Icon icon="spinner" spin />}
      { (suggestions.length > 0) && generateDropdown()}
    </div>
  )
}
export default AutoComplete;