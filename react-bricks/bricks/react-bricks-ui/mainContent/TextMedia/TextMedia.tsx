import classNames from 'classnames'
import { Image, Link, Repeater, RichText, types } from 'react-bricks/rsc'

import {
  LayoutProps,
  backgroundSideGroup,
  paddingBordersSideGroup,
  sectionDefaults,
} from '../../LayoutSideProps'
import blockNames from '../../blockNames'
import {
  buttonColors,
  highlightBgColors,
  highlightTextColors,
  textColors,
} from '../../colors'
import Container from '../../shared/components/Container'
import Section from '../../shared/components/Section'
import Video from '../../shared/components/Video'
import { photos } from '../../shared/defaultImages'

export interface TextMediaProps extends LayoutProps {
  mediaType: 'image' | 'multiple-images' | 'video-file' | 'video-streaming'
  imageSide: 'left' | 'right'
  bigImage?: boolean
  mobileImageTop?: boolean
  mobileIcon?: boolean
  hasShadow?: boolean
  isRounded?: boolean
  extraBoldTitle?: boolean
  bigText?: boolean
  heroSizeTitle?: boolean
  platform?: 'youtube' | 'vimeo'
  videoId?: string
  title: types.TextValue
  text: types.TextValue
  imageSource: types.IImageSource
  buttons: types.RepeaterItems
  bulletListItems: types.RepeaterItems
  badge: types.RepeaterItems
  logos: types.RepeaterItems
  videoFile: types.IFileSource
}

const TextMedia: types.Brick<TextMediaProps> = ({
  backgroundColor,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  imageSide,
  bigImage,
  mobileImageTop,
  mobileIcon,
  hasShadow,
  isRounded,
  extraBoldTitle,
  bigText,
  heroSizeTitle,
  mediaType,
  platform,
  videoId,
  title,
  text,
  imageSource,
  buttons,
  bulletListItems,
  badge,
  logos,
  videoFile,
}) => {
  const titleColor = textColors.GRAY_900
  const textColor = textColors.GRAY_700

  return (
    <Section
      backgroundColor={backgroundColor}
      borderTop={borderTop}
      borderBottom={borderBottom}
      noOverflowX={!!bigImage}
    >
      <Container paddingTop={paddingTop} paddingBottom={paddingBottom}>
        <div
          className={classNames(
            'flex sm:justify-between items-center',
            mobileImageTop ? 'flex-col-reverse' : 'flex-col',
            imageSide === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'
          )}
        >
          <div
            className={classNames('w-full md:w-2/5 lg:pr-[5%] flex flex-col')}
          >
            <Repeater
              propName="badge"
              items={badge}
              itemProps={{ textAlign: 'left' }}
              renderWrapper={(items) => (
                <div className="mb-4 flex justify-center md:justify-start">
                  {items}
                </div>
              )}
            />
            <RichText
              propName="title"
              value={title}
              renderBlock={(props) => (
                <h2
                  className={classNames(
                    'mt-0 text-center md:text-left text-2xl leading-7',
                    heroSizeTitle
                      ? 'md:text-[40px] md:leading-tight'
                      : 'md:text-[32px] md:leading-tight',
                    extraBoldTitle ? 'font-extrabold' : 'font-bold',
                    bigText ? 'mb-4' : 'mb-3',
                    titleColor
                  )}
                  {...props.attributes}
                >
                  {props.children}
                </h2>
              )}
              placeholder="Type a title..."
              allowedFeatures={[types.RichTextFeatures.Highlight]}
            />
            <RichText
              propName="text"
              value={text}
              renderBlock={(props) => (
                <p
                  className={classNames(
                    'leading-7 mb-3 text-center md:text-left',
                    { 'md:text-xl md:leading-8': bigText },
                    textColor
                  )}
                  {...props.attributes}
                >
                  {props.children}
                </p>
              )}
              placeholder="Type a text..."
              allowedFeatures={[
                types.RichTextFeatures.Bold,
                types.RichTextFeatures.Link,
              ]}
              renderLink={({ children, href, target, rel }) => (
                <Link
                  href={href}
                  target={target}
                  rel={rel}
                  className="inline-block text-sky-500 hover:text-sky-600 hover:-translate-y-px transition-all ease-out duration-150"
                >
                  {children}
                </Link>
              )}
            />
            <Repeater
              propName="bulletListItems"
              items={bulletListItems}
              itemProps={{
                className: bigText ? 'text-lg' : 'text-base',
              }}
              renderWrapper={(items) => (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-1">
                  {items}
                </div>
              )}
            />
            <Repeater
              propName="buttons"
              items={buttons}
              renderWrapper={(items) => (
                <div className="flex items-center space-x-4 mt-4">{items}</div>
              )}
            />
          </div>
          {mediaType === 'multiple-images' ? (
            <div
              className={classNames(
                'grid grid-cols-3 gap-6',
                mobileImageTop ? 'mt-0 mb-10' : 'mt-10 mb-0',
                'md:w-1/2 md:mt-0 md:mb-0'
              )}
            >
              <Repeater propName="logos" items={logos} />
            </div>
          ) : mediaType === 'image' ? (
            <div
              className={classNames(
                mobileIcon ? 'w-24' : 'w-full',
                mobileImageTop ? 'mt-0 mb-10' : 'mt-10 mb-0',
                'md:w-1/2 md:mt-0 md:mb-0'
              )}
            >
              <Image
                propName="imageSource"
                source={imageSource}
                alt="Image"
                imageClassName={classNames(
                  { 'rounded-lg': isRounded },
                  { 'shadow-2xl': hasShadow },
                  {
                    'md:h-[500px] md:max-w-none object-cover':
                      bigImage && imageSide === 'right',
                  }
                )}
              />
            </div>
          ) : mediaType === 'video-file' ? (
            <Video
              type="file"
              videoFile={videoFile}
              className={classNames(
                mobileImageTop ? 'mt-0 mb-10' : 'mt-10 mb-0',
                'w-full md:w-1/2 md:mt-0 md:mb-0'
              )}
            />
          ) : (
            <Video
              type="streaming"
              platform={platform}
              videoId={videoId}
              className={classNames(
                mobileImageTop ? 'mt-0 mb-10' : 'mt-10 mb-0',
                'w-full md:w-1/2 md:mt-0 md:mb-0'
              )}
            />
          )}
        </div>
      </Container>
    </Section>
  )
}

TextMedia.schema = {
  name: blockNames.TextMedia,
  label: 'Text Media',
  category: 'main content',
  tags: ['text media', 'text image', 'text video', 'text logos'],
  previewIcon: (
    <svg viewBox="0 0 10 10">
      <circle cx={5} cy={5} r={4} fill="red"></circle>
    </svg>
  ),
  previewImageUrl: `/bricks-preview-images/${blockNames.TextMedia}.png`,
  playgroundLinkLabel: 'View source code on Github',
  playgroundLinkUrl:
    'https://github.com/ReactBricks/react-bricks-ui/blob/master/src/website/TextMedia/TextMedia.tsx',
  getDefaultProps: () => ({
    ...sectionDefaults,
    title: 'Making content editing fun!',
    text: 'Our mission is making content editing fun, for everyone.',
    imageSource: photos.DESK_MAC,
    mediaType: 'image',
    imageSide: 'right',
    bigImage: false,
    mobileImageTop: false,
    mobileIcon: false,
    hasShadow: false,
    isRounded: false,
    extraBoldTitle: true,
    bigText: true,
    heroSizeTitle: false,
    bulletListItems: [
      {
        bulletColor: highlightBgColors.PINK.value,
        text: 'Marketing',
      },
      {
        bulletColor: highlightBgColors.SKY.value,
        text: 'Developers',
      },
      {
        bulletColor: highlightBgColors.GREEN.value,
        text: 'Designers',
      },
      {
        bulletColor: highlightBgColors.AMBER.value,
        text: 'Enterprise',
      },
    ],
  }),
  sideEditProps: [
    {
      groupName: 'Media',
      defaultOpen: true,
      props: [
        {
          name: 'mediaType',
          label: 'Media type',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Radio,
            options: [
              { value: 'image', label: 'Image' },
              { value: 'multiple-images', label: 'Multiple logos' },
              { value: 'video-file', label: 'Video (mp4 file)' },
              { value: 'video-streaming', label: 'Video (streaming)' },
            ],
          },
        },
        {
          name: 'imageSide',
          label: 'Media side',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Radio,
            options: [
              { value: 'left', label: 'Left' },
              { value: 'right', label: 'Right' },
            ],
          },
        },
        {
          name: 'mobileImageTop',
          label: 'Media on top on mobile',
          type: types.SideEditPropType.Boolean,
        },
      ],
    },
    {
      groupName: 'Image',
      //show: ({ mediaType }) => mediaType === 'image',
      defaultOpen: false,
      props: [
        {
          name: 'bigImage',
          label: 'Big image (only right side)',
          type: types.SideEditPropType.Boolean,
          show: (props) =>
            props.mediaType === 'image' && props.imageSide === 'right',
        },
        {
          name: 'mobileIcon',
          label: 'Show as icon on mobile',
          type: types.SideEditPropType.Boolean,
          show: (props) => props.mediaType === 'image',
        },
        {
          name: 'hasShadow',
          label: 'Image shadow-sm',
          type: types.SideEditPropType.Boolean,
          show: (props) => props.mediaType === 'image',
        },
        {
          name: 'isRounded',
          label: 'Image rounded-sm corners',
          type: types.SideEditPropType.Boolean,
          show: (props) => props.mediaType === 'image',
        },
      ],
    },
    {
      groupName: 'video',
      defaultOpen: true,
      show: ({ mediaType }) => mediaType === 'video-streaming',
      props: [
        {
          name: 'platform',
          label: 'Video platform',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Radio,
            options: [
              { value: 'youtube', label: 'YouTube' },
              { value: 'vimeo', label: 'Vimeo' },
            ],
          },
        },
        {
          name: 'videoId',
          label: 'Video ID (i.e. "L4NGrMRTY3M")',
          type: types.SideEditPropType.Text,
        },
      ],
    },
    {
      groupName: 'video mp4',
      show: ({ mediaType }) => mediaType === 'video-file',
      props: [],
    },
    {
      groupName: 'Text',
      props: [
        {
          name: 'heroSizeTitle',
          label: 'Hero-size title',
          type: types.SideEditPropType.Boolean,
        },
        {
          name: 'extraBoldTitle',
          label: 'Extrabold title',
          type: types.SideEditPropType.Boolean,
        },
        {
          name: 'bigText',
          label: 'Big text',
          type: types.SideEditPropType.Boolean,
        },
      ],
    },
    backgroundSideGroup,
    paddingBordersSideGroup,
  ],
  repeaterItems: [
    {
      name: 'badge',
      itemType: blockNames.Badge,
      itemLabel: 'Badge',
      min: 0,
      max: 1,
    },
    {
      name: 'bulletListItems',
      itemType: blockNames.BulletListItem,
      itemLabel: 'Feature',
      min: 0,
      max: 4,
    },
    {
      name: 'buttons',
      itemType: blockNames.Button,
      itemLabel: 'Button',
      min: 0,
      max: 2,
    },
    {
      name: 'logos',
      itemType: blockNames.TextMediaLogo,
      itemLabel: 'Logo',
      min: 0,
      max: 9,
    },
  ],
  stories: [
    {
      id: 'image-hero',
      name: 'Image Hero',
      previewImageUrl: `/bricks-preview-images/image-hero.png`,
      showAsBrick: true,
      props: {
        ...sectionDefaults,
        title: 'Add magic to your components',
        text: 'With little changes you can turn your React design system into visually editable content blocks your marketing will love.',
        imageSource: photos.IMAGE_TEXT_STORY_HERO,
        imageSide: 'right',
        bigImage: true,
        mobileImageTop: false,
        mobileIcon: false,
        hasShadow: true,
        isRounded: true,
        extraBoldTitle: false,
        bigText: false,
        heroSizeTitle: true,
        buttons: [
          {
            id: '6a41405a-4651-4899-b236-bc4f43cc1566',
            type: 'button',
            props: {
              text: 'Learn more',
              href: '',
              isTargetBlank: false,
              buttonColor: buttonColors.PINK.value,
              type: 'solid',
              isBigButton: false,
            },
          },
          {
            id: '25623fa5-f03d-4798-afef-7febb8aac580',
            type: 'button',
            props: {
              text: 'Sign up',
              href: '',
              isTargetBlank: false,
              buttonColor: buttonColors.PINK.value,
              type: 'outline',
              isBigButton: false,
            },
          },
        ],
        bulletListItems: [],
        badge: [
          {
            id: '3fc7d1eb-8d3d-49d8-94d3-47807c449a7a',
            type: 'badge',
            props: {
              text: 'Design system',
              badgeColor: highlightTextColors.LIME.value,
            },
          },
        ],
        logos: [],
      },
    },
  ],
}

export default TextMedia
