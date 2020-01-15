import { Component, OnInit, TemplateRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WorkerService, Worker } from 'src/app/services/worker.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('search', { static: false }) search: ElementRef;

  workers = new BehaviorSubject<Worker[]>([]);

  addEditWorkerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    sex: new FormControl(false, [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    contactInfo: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),
    id: new FormControl('')
  });

  isEditModal = false;

  coffeeSvg = faCoffee;

  searchTerm = '';

  pageSize = 10;

  page = 1;

  modalRef: NgbModalRef;

  constructor(private workerService: WorkerService, private modalService: NgbModal, private router: Router) {
    this.workerService.get().subscribe((workers) => {
      this.workers.next(workers);
    });
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.searchTerm = this.search.nativeElement.value;
        })
      )
      .subscribe();
  }

  delete(id: string) {
    return this.workerService.delete(id).subscribe((res) => {
      const newList = this.workers.value.filter((worker) => {
        return worker._id !== id;
      });
      this.workers.next(newList);
    });
  }

  openModal(content: TemplateRef<any>, worker?: Worker) {
    if (worker) {
      this.addEditWorkerForm.setValue({
        fullName: worker.fullName,
        sex: worker.sex,
        salary: worker.salary,
        contactInfo: worker.contactInfo,
        position: worker.position,
        id: worker._id
      });
    }
    this.modalRef = this.modalService.open(content);
  }

  addEditWorker(form) {
    const workersList = this.workers.value;
    if (this.isEditModal) {
      this.workerService.edit(form.id, form).subscribe(() => {
        workersList.forEach((worker, i) => {
          if (worker._id === form.id) {
            delete form.id;
            workersList[i] = { ...worker, ...form };
          }
        });
      });
    } else {
      this.workerService.create(form).subscribe((res: { message: string, data: Worker }) => {
        workersList.push(res.data);
      });
    }
    this.modalRef.dismiss();
    this.addEditWorkerForm.reset();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
