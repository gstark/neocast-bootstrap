import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from './Tooltip'
import { omit } from './utils'

const omitKeys = ['defaultOpen']

export class UncontrolledTooltip extends Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: props.defaultOpen || false }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    return <Tooltip isOpen={this.state.isOpen} toggle={this.toggle} {...omit(this.props, omitKeys)} />
  }
}

UncontrolledTooltip.propTypes = {
  defaultOpen: PropTypes.bool,
  ...Tooltip.propTypes,
}
