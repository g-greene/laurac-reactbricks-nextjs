import React from 'react'
import { Image, types } from 'react-bricks/frontend'
import blockNames from '../react-bricks-ui/blockNames'
import Container from '../react-bricks-ui/shared/components/Container'
import Section from '../react-bricks-ui/shared/components/Section'
import { photos } from '../react-bricks-ui/shared/defaultImages'
import {
  containerWidthSideGroup,
  LayoutProps,
  neutralBackgroundSideGroup,
  paddingBordersSideGroup,
  sectionDefaults,
} from '../react-bricks-ui/LayoutSideProps'

interface BigHeroImageProps extends LayoutProps {

}

const BigHeroImage: types.Brick<BigHeroImageProps> = ({
  backgroundColor,
  borderTop,
  borderBottom,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  width,
  maxWidth
}) => {
  return (
    <Section
      backgroundColor={backgroundColor}
      borderTop={borderTop}
      borderBottom={borderBottom}
      overflow='hidden'
    >
      <Container
        size={width}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
      >
        <Image propName="image" alt="Image" maxWidth={maxWidth} />
      </Container>
    </Section>
  )
}

BigHeroImage.schema = {
  name: 'big-hero-image',
  label: 'Big Hero Image',
  category: 'single column / blog',
  tags: ['blog', 'image', 'big hero image', 'single image'],
  previewImageUrl: `/bricks-preview-images/${blockNames.BigImage}.png`,
  getDefaultProps: () => ({
    ...sectionDefaults,
    width: 'small',
    paddingTop: '12',
    paddingRight: '0',
    paddingBottom: '12',
    paddingLeft: '0',
    image: photos.SEASIDE,
  }),
  sideEditProps: [
    neutralBackgroundSideGroup,
    paddingBordersSideGroup,
    containerWidthSideGroup,
  ],
}

export default BigHeroImage
