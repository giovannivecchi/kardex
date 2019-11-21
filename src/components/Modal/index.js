import React from 'react';

 import { Modal2 } from './styles';

 export default class Modal extends React.Component {
  render() {
      if(!this.props.show){
          return null;
      }
    return <Modal2>Hello Modal</Modal2>;
  }
}