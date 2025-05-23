import type { MDXComponents } from "mdx/types";
import React, { ComponentPropsWithoutRef } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";

/* eslint-disable @next/next/no-img-element */

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type ImageProps = ComponentPropsWithoutRef<"img">;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: HeadingProps) => (
      <h1 className="font-bold text-xl pt-12 mb-2" {...props} />
    ),
    h2: (props: HeadingProps) => (
      <h2
        className="font-bold text-gray-800 dark:text-zinc-200 mt-8 mb-3"
        {...props}
      />
    ),
    h3: (props: HeadingProps) => (
      <h3
        className="text-gray-800 dark:text-zinc-200 font-medium mt-8 mb-3"
        {...props}
      />
    ),
    h4: (props: HeadingProps) => (
      <h4
        className="text-sm font-medium text-gray-500 dark:text-zinc-400"
        {...props}
      />
    ),
    h5: (props: HeadingProps) => <h5 className="text-sm" {...props} />,
    h6: (props: HeadingProps) => <h6 className="font-mono" {...props} />,
    p: (props: ParagraphProps) => (
      <p className="text-gray-800 dark:text-zinc-300 leading-snug" {...props} />
    ),
    ol: (props: ListProps) => (
      <ol
        className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2"
        {...props}
      />
    ),
    ul: (props: ListProps) => (
      <ul
        className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1"
        {...props}
      />
    ),
    li: (props: ListItemProps) => <li className="pl-1" {...props} />,
    em: (props: ComponentPropsWithoutRef<"em">) => (
      <em className="font-medium" {...props} />
    ),
    strong: (props: ComponentPropsWithoutRef<"strong">) => (
      <strong className="font-bold" {...props} />
    ),
    a: ({ href, children, ...props }: AnchorProps) => {
      const className =
        "text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800";
      if (href?.startsWith("/")) {
        return (
          <Link href={href} className={className} {...props}>
            {children}
          </Link>
        );
      }
      if (href?.startsWith("#")) {
        return (
          <a href={href} className={className} {...props}>
            {children}
          </a>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        >
          {children}
        </a>
      );
    },
    Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
      <table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
    blockquote: (props: BlockquoteProps) => (
      <blockquote
        className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
        {...props}
      />
    ),
    img: (props: ImageProps) => {
      if (props.title !== undefined) {
        return (
          <figure>
            <img
              className="shadow-sm dark:shadow-gray-800"
              src={props.src}
              alt={props.alt}
              {...props}
            />
            <figcaption className="text-sm text-start mt-1 text-gray-500 dark:text-zinc-400">
              {props.title}
            </figcaption>
          </figure>
        );
      }
      return (
        <Image
          src={props.src as string}
          alt={props.alt as string}
          // {...props}
          className="shadow-sm dark:shadow-gray-800"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      );
    },
    ...components,
  };
}
