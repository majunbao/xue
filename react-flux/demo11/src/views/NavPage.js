import {h} from 'preact';

function Navigator(props) {
  return (
    <div><pre>{JSON.stringify(props.canvas).replace(/,/g, ',\n')}</pre></div>
  )
}

export default Navigator;