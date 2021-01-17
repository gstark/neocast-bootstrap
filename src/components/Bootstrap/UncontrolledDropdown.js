import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { omit } from './utils'
import { Dropdown } from './Dropdown'

const omitKeys = ['defaultOpen']

export class UncontrolledDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: props.defaultOpen || false }
    this.toggle = this.toggle.bind(this)
  }

  toggle(e) {
    this.setState({ isOpen: !this.state.isOpen })
    if (this.props.onToggle) {
      this.props.onToggle(e, !this.state.isOpen)
    }
  }

  render() {
    return <Dropdown isOpen={this.state.isOpen} toggle={this.toggle} {...omit(this.props, omitKeys)} />
  }
}

UncontrolledDropdown.propTypes = {
  defaultOpen: PropTypes.bool,
  onToggle: PropTypes.func,
  ...Dropdown.propTypes,
}