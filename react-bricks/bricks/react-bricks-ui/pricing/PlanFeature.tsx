import React from 'react'
import classNames from 'classnames'
import { types, Text, Plain } from 'react-bricks/rsc'
import blockNames from '../blockNames'
import { pricingColors, PricingColorValue } from '../colors'

interface PlanFeatureProps {
  withTag?: boolean
  featureText: types.TextValue
  tag: types.TextValue
  pricingColor: PricingColorValue
}

const PlanFeature: types.Brick<PlanFeatureProps> = ({
  withTag,
  featureText,
  tag,
  pricingColor,
}) => {
  const featureTextContent =
    typeof featureText === 'string' ? featureText : Plain.serialize(featureText)

  return (
    <div
      className={classNames(
        featureTextContent === '' ? 'block w-full' : 'flex items-center'
      )}
    >
      {featureTextContent === '' ? null : (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className=" text-lg text-lime-500 mr-2"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
        </svg>
      )}

      <Text
        propName="featureText"
        value={featureText}
        renderBlock={(props) => <span>{props.children}</span>}
        placeholder="type a text"
      />
      {withTag && featureTextContent !== '' ? (
        <Text
          propName="tag"
          value={tag}
          renderBlock={(props) => (
            <div
              className={classNames(
                'ml-1.5 min-w-[30px] px-1 py-1 leading-none rounded-sm font-medium text-sm',
                pricingColor.featureTagClassName
              )}
            >
              {props.children}
            </div>
          )}
          placeholder="tag"
        />
      ) : null}
    </div>
  )
}

PlanFeature.schema = {
  name: blockNames.PlanFeature,
  label: 'Feature',
  category: 'pricing',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    featureText: 'Up to 10 users',
    withTag: false,
    tag: 'Add-on',
  }),
  sideEditProps: [
    {
      name: 'withTag',
      label: 'With tag',
      type: types.SideEditPropType.Boolean,
    },
  ],
}

export default PlanFeature
