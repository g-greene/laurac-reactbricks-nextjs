'use client'

import classNames from 'classnames'
import * as React from 'react'
import { Link, RichText, Text, isAdmin, types } from 'react-bricks/rsc'

import { LayoutProps } from '../../LayoutSideProps'
import { gradients, textColors } from '../../colors'
import Container from '../../shared/components/Container'
import Section from '../../shared/components/Section'

export interface NewsletterHeroProps extends LayoutProps {
  textGradient: keyof typeof gradients
  title: types.TextValue
  description: types.TextValue
  text: types.TextValue
  buttonText: types.TextValue
  privacy: types.TextValue
}

const NewsletterHeroClient: React.FC<
  React.PropsWithChildren<NewsletterHeroProps>
> = ({
  backgroundColor,
  borderTop,
  borderBottom,
  paddingTop,
  paddingBottom,
  textGradient = gradients.NONE.value,
  title,
  description,
  text,
  buttonText,
  privacy,
}) => {
  const titleStyle =
    textGradient !== gradients.NONE.value
      ? { WebkitTextFillColor: 'transparent' }
      : {}

  return (
    <Section
      backgroundColor={backgroundColor}
      borderTop={borderTop}
      borderBottom={borderBottom}
    >
      <Container
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        className={classNames(
          'flex flex-col lg:flex-row lg:gap-20 items-start text-left'
        )}
      >
        <div className="flex-1 lg:pr-14 mb-4 lg:mb-0">
          <div className="mb-4" style={titleStyle}>
            <Text
              propName="title"
              value={title}
              renderBlock={(props) => (
                <h2
                  className={classNames(
                    'font-bold text-[32px] leading-tight md:text-4xl xl:text-5xl bg-clip-text bg-linear-to-r',
                    textColors.GRAY_900,
                    gradients[textGradient].className
                  )}
                  {...props.attributes}
                >
                  {props.children}
                </h2>
              )}
              placeholder="Call to action text"
            />
          </div>
          <RichText
            propName="description"
            value={description}
            renderBlock={(props) => (
              <p
                className={classNames('text-sm', textColors.GRAY_700)}
                {...props.attributes}
              >
                {props.children}
              </p>
            )}
            placeholder="Description"
            allowedFeatures={[types.RichTextFeatures.Bold]}
          />
        </div>
        <div className="flex-1">
          <div className="mb-6">
            <Text
              propName="text"
              value={text}
              renderBlock={(props) => (
                <span
                  className={classNames('leading-relaxed', textColors.GRAY_800)}
                  {...props.attributes}
                >
                  {props.children}
                </span>
              )}
              placeholder="Call to action text"
            />
          </div>
          <div>
            <form className="flex flex-col sm:flex-row">
              <label className="relative">
                <svg
                  viewBox="0 0 14 14"
                  width="14px"
                  height="14px"
                  className="absolute left-4 top-1/2 -mt-[7px] z-10"
                >
                  <path
                    fill="#9ca3af"
                    d="M0 2.5c0-.27.22-.5.5-.5h13c.28 0 .5.23.5.5v9a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-9Zm1 1.02V11h12V3.52L7.31 7.89a.5.5 0 0 1-.52.07.5.5 0 0 1-.1-.07L1 3.52ZM12.03 3H1.97L7 6.87 12.03 3Z"
                  ></path>
                </svg>

                <input
                  className="w-full md:w-auto bg-white focus:outline-hidden border-t border-l border-r sm:border-r-0 sm:border-b border-gray-300 focus:border-sky-500 rounded-t-md sm:rounded-tr-none sm:rounded-l-md py-2 px-4 appearance-none leading-normal pl-10"
                  type="text"
                  placeholder="Your email address"
                />
              </label>
              <button
                type="submit"
                className="bg-sky-500 px-6 rounded-b-md sm:rounded-bl-none sm:rounded-r-md text-white font-bold py-2 whitespace-nowrap w-full md:w-auto min-w-[80px]"
                disabled={isAdmin()}
                // style={{ backgroundColor: '#2f9ff4' }}
              >
                <Text
                  propName="buttonText"
                  value={buttonText}
                  placeholder="Action..."
                  renderBlock={({ children }) => (
                    <span className="text-center">{children}</span>
                  )}
                />
              </button>
            </form>
            <div className="mt-2">
              <RichText
                propName="privacy"
                value={privacy}
                renderBlock={(props) => (
                  <span
                    className={classNames(
                      'text-xs leading-relaxed',
                      textColors.GRAY_500
                    )}
                    {...props.attributes}
                  >
                    {props.children}
                  </span>
                )}
                placeholder="Privacy..."
                allowedFeatures={[types.RichTextFeatures.Link]}
                renderLink={({ children, href, target, rel }) => (
                  <Link
                    href={href}
                    target={target}
                    rel={rel}
                    className="underline"
                  >
                    {children}
                  </Link>
                )}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default NewsletterHeroClient
