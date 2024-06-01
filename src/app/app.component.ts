import { Component, inject, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ConsultaFipeService } from './services/consulta-fipe.service';
import { SpinnerService } from './services/spinner.service';
import { SpinnerComponent } from './core/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, SpinnerComponent],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 h-100 d-flex flex-column justify-content-center align-items-center">
          <div>
            <h3>Consulta Tabela FIPE</h3>
              <input #value class="form-control" type="text" placeholder="Informe o código FIPE do veículo" (change)="setValue(value.value)">
              <button class="btn btn-primary mt-3" (click)="submit()">Enviar</button>
            
          </div>
          <div>
            @if (data != null || data != undefined) {
              <table class="table">
                <thead>
                  <tr>
                    <th>Marca:</th>
                    <th>Modelo:</th>
                    <th>Ano:</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  @for (item of data; track $index) {
                    <tr>
                      <td>{{ item.marca }}</td>
                      <td>{{ item.modelo }}</td>
                      <td>{{ item.anoModelo }}</td>
                      <td>{{ item.valor }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            }
            <app-spinner />
          </div>
        </div>
      </div>
    </div>

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'consulta-tabela-fipe';

  private consultaFipeService = inject(ConsultaFipeService);
  private spinnerService = inject(SpinnerService);
  public codigo = new FormControl("");
  public data?: any[];

  setValue(value: string) {
    this.codigo.setValue(value);
  }

  submit() {
    this.data = undefined;
    this.spinnerService.show();
    this.consultaFipeService.getCódigo(this.codigo.value!).subscribe({
      next: (value) => {
        this.data = value;
        this.spinnerService.hide();
      },
      error: (err) => {
        this.spinnerService.hide();
        window.alert(err.error.message);
      }
    });
  }

}
