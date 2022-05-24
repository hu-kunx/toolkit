import * as React from "react";

function Icon () {
  return <i></i>
}

interface MultipleSelectComponentProps {
  children: any,
  multiple?: boolean,
  values?: string | string[]
  onChange?: ( val: string | string[] ) => void
  placeholder?: string
  text?: MultipleSelectorText
  placeholderFunc?: ( val: string[], allSize: number, dp: string ) => string
}

interface MultipleSelectorText {
  defaultPlaceholder?: string,
  selectAll?: string,
}

interface MultipleSelectorState {
  open: boolean
  selected: string[]
}

interface RenderPlaceholderProps {
  selected: string[]
  placeholder: string
  len: number
  selectAll: string
}


function Options ( props: { key: string, value: string, label: string } ) {
  return null;
}

function formatPlaceholder ( { len, placeholder, selected, selectAll }: RenderPlaceholderProps ) {
  const sedLen = selected.length;
  if ( sedLen === 0 ) {
    return placeholder
  }
  if ( len === sedLen ) {
    return selectAll
  }
  if ( Math.floor( sedLen / len * 100 ) > 30 ) {
    return `${ sedLen } of ${ len } selected`
  }
  return selected.join( ', ' );
}

function RenderAllSelectDoneState ( { curLen, allSize }: { allSize: number, curLen: number } ) {
  if ( allSize === 0 ) {
    return null
  }
  if ( curLen > 0 && allSize !== curLen ) {
    return <Icon className={ 'select-check' } type='line'/>
  }
  if ( curLen === allSize ) {
    return <Icon className={ 'select-check' } type="check"/>
  }
  return null
}

function IsRender ( { show, children }: { show: boolean, children: any } ) {
  if ( show ) {
    return children
  }
  return null
}

function MultipleSelector ( props: MultipleSelectComponentProps ) {
  const defaultText: MultipleSelectorText = {
    defaultPlaceholder: "请选择",
    selectAll: "全选"
  };
  const { children, multiple = false, text = defaultText, placeholder, placeholderFunc, onChange, values } = props;
  const [ state, set ] = React.useState<MultipleSelectorState>( {
    open: false,
    selected: []
  } );
  const setState = ( o: { [ key: string ]: any } ) => set( { ...state, ...o } );

  const Children = React.Children.toArray( children );

  function close () {
    setState( { open: false } )
  }

  function open () {
    setState( { open: true } )
  }

  function toggle () {
    setState( { open: !state.open } )
  }

  /**
   * 选择全部与取消
   */
  function selectAll () {
    const allLen = Children.length;
    if ( allLen === state.selected.length ) {
      setState( { selected: [] } )
    } else {
      setState( { selected: Children.map( v => v.props.value ) } )
    }
  }

  /**
   * 点击某一项
   * @param val
   */
  function onSelected ( val: string ) {
    let sed = state.selected;
    if ( multiple ) {
      if ( sed.includes( val ) ) {
        sed = sed.filter( v => v !== val )
      } else {
        sed = [ ...sed, val ]
      }
    } else {
      sed = [ val ]
    }
    setState( { selected: sed, open: multiple } );
    onChange && onChange( multiple ? sed : sed[ 0 ] )
  }

  const allSize = Children.length;
  const selectedSize = state.selected.length;

  function getPlaceholderValue () {
    if ( placeholderFunc ) {
      return placeholderFunc( state.selected, allSize, text.defaultPlaceholder as string )
    }
    return formatPlaceholder( {
      len: allSize,
      selected: state.selected,
      placeholder: (placeholder || text.defaultPlaceholder) as string,
      selectAll: text.selectAll as string
    } )
  }

  React.useEffect( () => {
    if ( values ) {
      setState( { selected: multiple ? values : [ values ] } )
    }
  }, [ multiple, values ] );

  return (
    <div className={ 'select-container' }>
      <div
        className={ 'select-mask' }
        onClick={ close }
        hidden={ !state.open }
      />
      <button onFocus={ open } className={ 'select-content' }>
        <div
          className={ 'select-placeholder' }
          style={ { color: selectedSize === 0 ? '#ccc' : 'currentColor' } }
        >
          { getPlaceholderValue() }
        </div>
        <Icon
          type={ state.open ? "caret-up" : "caret-down" }
          style={ { cursor: "pointer" } }
          onClick={ toggle }
        />
      </button>
      <div className={ 'select-drop' }>
        <ul style={ { height: !state.open ? 0 : '100%' } }>
          <IsRender show={ multiple }>
            <li onClick={ selectAll }>
              <div className={ 'select-item-content' }>{ text.selectAll }</div>
              <RenderAllSelectDoneState allSize={ allSize } curLen={ selectedSize }/>
            </li>
          </IsRender>
          { Children.map( (( child, index ) => (
            <li key={ index } onClick={ () => onSelected( child.props.value ) }>
              <div className={ 'select-item-content' }>
                { child.props.label }
              </div>
              <IsRender show={ state.selected.includes( child.props.value ) }>
                <Icon className={ 'select-check' } type="check"/>
              </IsRender>
            </li>
          )) ) }
        </ul>
      </div>
    </div>
  )
}

MultipleSelector.Options = Options;

export { MultipleSelector }

