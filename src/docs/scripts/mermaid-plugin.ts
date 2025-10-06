import { visit } from 'unist-util-visit';
import type { RehypePlugin } from "@astrojs/markdown-remark";

let mermaidCounter = 0;

export const rehypeMermaidPlugin: RehypePlugin = () => {
  return (tree) => {
    visit(tree, (node: any) => {
      if (node.type === 'element' && node.tagName === 'pre') {
        const codeElement = node.children?.find(
          (child: any) => child.type === 'element' && child.tagName === 'code'
        );

        if (codeElement) {
          const className = codeElement.properties?.className;

          if (Array.isArray(className) && className.includes('language-mermaid')) {
            const textNode = codeElement.children?.[0];

            if (textNode && textNode.type === 'text') {
              const code = textNode.value;
              const id = `mermaid-${mermaidCounter++}`;

              node.type = 'mdxJsxFlowElement';
              node.name = 'MermaidRenderer';
              node.attributes = [
                {
                  type: 'mdxJsxAttribute',
                  name: 'code',
                  value: code
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'id',
                  value: id
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'client:load',
                  value: null
                }
              ];
              node.children = [];
              delete node.tagName;
              delete node.properties;
            }
          }
        }
      }
    });
  };
};