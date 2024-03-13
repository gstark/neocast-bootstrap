/* eslint-disable react/forbid-foreign-prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

import { mapToCssModules, omit, pick, TransitionPropTypeKeys, TransitionTimeouts, tagPropType } from './utils'

const propTypes = {
  ...Transition.propTypes,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  tag: tagPropType,
  baseClass: PropTypes.string,
  baseClassActive: PropTypes.string,
  className: PropTypes.string,
  cssModule: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
}

const defaultProps = {
  ...Transition.defaultProps,
  tag: 'div',
  baseClass: 'fade',
  baseClassActive: 'show',
  timeout: TransitionTimeouts.Fade,
  appear: true,
  enter: true,
  exit: true,
  in: true,
}

function Fade(props) {
  const { tag: Tag, baseClass, baseClassActive, className, cssModule, children, innerRef, ...otherProps } = props
  const nodeRef = React.useRef(null)

  const transitionProps = pick(otherProps, TransitionPropTypeKeys)
  const childProps = omit(otherProps, TransitionPropTypeKeys)

  return (
    <Transition {...transitionProps} nodeRef={nodeRef}>
      {status => {
        const isActive = status === 'entered'
        const classes = mapToCssModules(classNames(className, baseClass, isActive && baseClassActive), cssModule)
        return (
          <div ref={nodeRef}>
            <Tag className={classes} {...childProps} ref={innerRef}>
              {children}
            </Tag>
          </div>
        )
      }}
    </Transition>
  )
}

Fade.propTypes = propTypes
Fade.defaultProps = defaultProps

export default Fade
