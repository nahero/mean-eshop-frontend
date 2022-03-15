import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  /**
   * Toast message functions
   */
  displayMessage(summary: string, detail: string, severity: string = 'success') {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  categoryCreatedMessage(categoryName: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Category created',
      detail: `Category "${categoryName}" was created successfully`
    });
  }

  categoryDeletedMessage(categoryName: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Category created',
      detail: `Category "${categoryName}" was created successfully`
    });
  }

  displayMessageMultiple() {
    this.messageService.addAll([
      { severity: 'success', summary: 'Service Message', detail: 'Via MessageService' },
      { severity: 'info', summary: 'Info Message', detail: 'Via MessageService' }
    ]);
  }

  clear() {
    this.messageService.clear();
  }
}
