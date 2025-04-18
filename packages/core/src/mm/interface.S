#include <combo.h>

LoadRupeeColor:
  la t8,gInterfaceRupeeColor
  lw t8,0(t8)
  bnez t8,.+0xc
    nop
  li t6,0
  or t8,t6
  jr ra
   sw t8,0x4(a1)

PATCH_START 0x8011f4a4
  jal LoadRupeeColor
   nop
PATCH_END

/* Use our own update button wrapper */
.globl Interface_UpdateButtonsPart2
Interface_UpdateButtonsPart2:
  addiu sp,-0x80
  j     _Interface_UpdateButtonsPart2+0x08
   lui  t0,0x801f

PATCH_START _Interface_UpdateButtonsPart2
  j Interface_UpdateButtonsPart2Wrapper
   nop
PATCH_END

/* Don't use the default rupee delta code */
PATCH_START 0x8012154c
  j 0x80121648
PATCH_END

/* Use our wrapper */
PATCH_START 0x80167c78
  jal Interface_Update
PATCH_END

/* Use our after draw */
PATCH_START 0x80120f88
  j Interface_AfterDraw
PATCH_END
