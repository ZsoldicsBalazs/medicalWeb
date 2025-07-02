import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHtmlTags'
})
export class RemoveHtmlTagsPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';
    
    // First replace <br> and <br/> with newlines
    const withNewlines = value.replace(/<br\s*\/?>/gi, '\n');
    
    // Then remove any other HTML tags
    const withoutTags = withNewlines.replace(/<[^>]*>/g, '');
    
    // Trim extra whitespace and normalize newlines
    return withoutTags
      .replace(/\n{3,}/g, '\n\n')  // Replace 3 or more newlines with 2
      .trim();
  }
} 