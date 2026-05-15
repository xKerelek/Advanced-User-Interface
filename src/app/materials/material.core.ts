import {NgModule} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatFabAnchor} from '@angular/material/button';
import {MatFormField, MatLabel, MatInput, MatError} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatChip, MatChipSet} from '@angular/material/chips';
import {MatActionList, MatListItem, MatListItemIcon} from '@angular/material/list';


@NgModule({
  imports: [MatIcon, MatButton, MatFabAnchor, MatFormField, MatLabel, MatInput, MatCheckbox, MatCard, MatCardHeader, MatCardContent, MatChip ,MatChipSet, MatActionList, MatListItem, MatListItemIcon, MatError],
  exports: [MatIcon, MatButton, MatFabAnchor, MatFormField, MatLabel, MatInput, MatCheckbox, MatCard, MatCardHeader, MatCardContent, MatChip, MatChipSet, MatActionList, MatListItem, MatListItemIcon, MatError]
})
export class MaterialModule {}
