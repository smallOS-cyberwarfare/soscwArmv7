" Change colorscheme
colorscheme habamax

" Add small horizontal padding
set foldcolumn=1
set numberwidth=1
set colorcolumn=87

"Enable syntax highlighting
syntax enable

" Enable filetype detection
filetype plugin indent on

" Enable line numbers
" set number

" Use spaces instead of tabs
set expandtab
set tabstop=2
set shiftwidth=2

" Enable cursor line highlighting
set cursorline

" Customize CursorLine highlight
highlight CursorLine cterm=NONE ctermbg=Black gui=NONE guibg=Black

" Customize CursorLineNr highlight
highlight CursorLineNr cterm=NONE ctermfg=NONE ctermbg=Black gui=NONE guifg=NONE guibg=Black

" Highlight search results
set hlsearch

" Show matching parentheses
set showmatch

" Enable incremental search
set incsearch

" Enable smart case for searching
set smartcase

" Enable mouse support
set mouse=a

" Enable clipboard integration
set clipboard=unnamedplus

" Disable backup and swap files
set nobackup
set noswapfile

" Enable autoindentation
set autoindent

" Enable smart indentation
set smartindent

" Enable auto-pairing of brackets, quotes, etc.
" inoremap ( ()<Left>
" inoremap [ []<Left>
" inoremap { {}<Left>
" inoremap ' ''<Left>
" inoremap " ""<Left>
" inoremap ` ``<Left>

" Map <Tab> to trigger autocompletion
"inoremap <Tab> <C-n>

" Map <Shift+Tab> to go back in autocompletion
"inoremap <S-Tab> <C-p>

" Enable file explorer
let g:netrw_banner = 0
let g:netrw_liststyle = 3
let g:netrw_browse_split = 4
let g:netrw_winsize = 25

" Enable status line
set laststatus=2

" Set colorscheme (uncomment the line below and choose a colorscheme)
" colorscheme <name>

" Set default file encoding
set encoding=utf-8

" Set default file format (unix)
set fileformat=unix

" Set default file type based on the file extension
filetype indent on
filetype plugin on
filetype plugin indent on

" Leader key for custom shortcuts
let mapleader = ","

" TypeScript type highlighting
let g:typescript_highlight_builtins = 1
let g:typescript_enable_domhtmlcss = 1


" Comment HTML
nnoremap <leader>ch I<!-- <Esc>A --><Esc>O<End><Del><Esc>
" Remove Comment
nnoremap <leader>rh :s/<!-- \(.*\) -->/\1<CR>


" Comment CSS
nnoremap <leader>cc I/* <Esc>A */<Esc>O<End><Del><Esc>
" Remove Comment
nnoremap <leader>rc :s/\/\* \(.*\) \*\//\1<CR>



" Vim-Plug config  (run `:PlugInstall` to install)
call plug#begin('~/.vim/plugged')

" Add emmet plugin
Plug 'mattn/emmet-vim'

" Add NERDTree plugin
Plug 'preservim/nerdtree'

" Add coc plugin
Plug 'neoclide/coc.nvim', {'branch': 'release'}


" End Vim-Plug config
call plug#end()


" Use tab to autocompletion
inoremap <expr> <Tab> pumvisible() ? "\<C-y>" : "\<Tab>"

" Use <S-Tab> to go back
inoremap <silent><expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

let g:coc_global_extensions = [
      \ 'coc-json',
      \ 'coc-tsserver',
      \ 'coc-eslint',
      \ 'coc-prettier',
      \ 'coc-python',
      \ 'coc-sh',
      \ 'coc-cmake'
      \]

" Enable real-time autocompletion
autocmd FileType javascript,c,cpp,c,cpp,objcpp,typescript,json,mocha,python,sh,cmake setl omnifunc=javascriptcomplete#CompleteJS

" Enable diagnostics
let g:coc_enable_diagnostic_auto_update = 1

" Language-specific settings
augroup mygroup
  autocmd!
  autocmd FileType javascript setl omnifunc=javascriptcomplete#CompleteJS
  autocmd FileType typescript setl omnifunc=typescriptcomplete#CompleteTS
  autocmd FileType python setl omnifunc=pythoncomplete#Complete
  autocmd FileType sh setl omnifunc=shcomplete#Complete
  autocmd FileType cmake setl omnifunc=cmakecomplete#Complete
augroup end

" Show floating documentation
inoremap <silent><expr> <c-space> coc#refresh()



" Use <Leader>N as alias for :NERDTree
nmap <Leader>n :NERDTreeToggle<CR>


" Use triple comma to expand emmet sintax
let g:user_emmet_leader_key=',,'
au FileType html,css,js,ts,javascriptreact,typescriptreact imap <expr> ,, <SID>emmetExpandAbbr()
function! s:emmetExpandAbbr()
    if getline('.')[col('.') - 3] == ','
        return "\<C-y>,"
    else
        return ",,"
    endif
endfunction


function! AddHtmlSnippet(snippet)
  let emmet_file = expand('~/.vim/plugged/emmet-vim/autoload/emmet.vim')
  let emmet_content = readfile(emmet_file)

  let start_pattern = "\\\\\\s*'html:5': \"<!DOCTYPE html>\\\\n\""
  let end_pattern = '\.\("<\/html>"\),'

  let start_line = -1
  let end_line = -1

  for i in range(len(emmet_content))
    if emmet_content[i] =~ start_pattern
      let start_line = i
    endif

    if start_line != -1 && emmet_content[i] =~ end_pattern
      let end_line = i
      break
    endif
  endfor

  if start_line != -1 && end_line != -1
    let line_number = end_line + 1
    call insert(emmet_content, a:snippet, line_number)
    call writefile(emmet_content, emmet_file)
  endif
endfunction

" Add html:sm (sm == StringManolo), that's the template I usually use
let snippet_html_sm = "\\            'html:sm': \"<!DOCTYPE html>\\n<html lang=\\\"en\\\">\\n<head prefix=\\\"og:http://ogp.me/ns#\\\">\\n\\t<meta charset=\\\"utf-8\\\">\\n\\t<link rel=\\\"icon\\\" href=\\\"data:;base64,iVBORw0KGgo=\\\">\\n\\t<title>Index.html</title>\\n\\t<meta property=\\\"og:type\\\" content=\\\"website\\\">\\n\\t<link rel=\\\"stylesheet\\\" href=\\\"./styles.css\\\">\\n\\t<meta name=\\\"theme-color\\\" content=\\\"#ffffff\\\">\\n</head>\\n\\n<body>\\n\\t|\\n\\n\\t<script src=\\\"./main.js\\\"></script>\\n</body>\\n</html>\","

" Check if the snippet html:sm exists before calling the function
if stridx(join(readfile(expand('~/.vim/plugged/emmet-vim/autoload/emmet.vim')), "\n"), 'html:sm') == -1
  call AddHtmlSnippet(snippet_html_sm)
endif
