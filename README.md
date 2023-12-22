# ddu-filter-converter_file_git_status

`git status` converter for ddu.vim.

## Required
### git
https://git-scm.com

### denops.vim  
https://github.com/vim-denops/denops.vim

### ddu.vim  
https://github.com/Shougo/ddu.vim

## Configuration
```vim
call ddu#custom#patch_global(#{
    \   sourceOptions: #{
    \     _: #{
    \       converters: ['converter_file_git_status'],
    \     },
    \   }
    \ })
```
