/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module 'node_modules/.pnpm/@radix-ui+react-tabs@1.0.4_@types+react-dom@18.2.14_@types+react@18.2.33_react-dom@18.2.0_react@18.2.0/node_modules/@radix-ui/react-tabs/dist/index.d.ts' {
  export interface TabsProps extends PrimitiveDivProps {
    /** The value for the selected tab, if controlled */
    value?: string | null; // Modify the type here
    // Add or modify other properties as needed
  }
}
