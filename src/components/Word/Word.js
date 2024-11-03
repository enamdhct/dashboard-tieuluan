'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import React ,{ useCallback } from 'react'
const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Image,
    ],
    content: '<p>Hello World! 🌎️</p>',
    autofocus: true,
    editable: true,
    injectCSS: false,
  })
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) {
    return null
  }
  return (
    <div className='bg-white'>
        <button onClick={addImage}>setImage</button>
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap