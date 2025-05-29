import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-puesto',
  templateUrl: './agregar-puesto.component.html',
  styleUrls: ['./agregar-puesto.component.css']
})
export class AgregarPuestoComponent {
  oferta = {
    empresa: '',
    ubicacion: '',
    duracion: '',
    vacantes: '',
    estado: '',
    publicadaPor: '',
    requisitos: '',
    descripcion: '',
    fechaPublicacion: new Date().toISOString(),
    id: this.generarIdUnico()
  };

  private readonly LOCAL_STORAGE_KEY = 'ofertasLaborales';

  constructor(
    public dialogRef: MatDialogRef<AgregarPuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  guardarOferta(): void {
    if (this.validarCampos()) {
      this.guardarEnLocalStorage();
      alert('Oferta laboral guardada correctamente');
      this.dialogRef.close(true);
    } else {
      alert('Por favor complete todos los campos obligatorios');
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  private validarCampos(): boolean {
    return !!this.oferta.empresa && !!this.oferta.ubicacion && 
           !!this.oferta.duracion && !!this.oferta.estado &&
           !!this.oferta.descripcion;
  }

  private guardarEnLocalStorage(): void {
    const ofertas = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]');
    
    ofertas.push({
      ...this.oferta,
      id: this.generarIdUnico() 
    });
    
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(ofertas));
  }

  private limpiarFormulario(): void {
    this.oferta = {
      empresa: '',
      ubicacion: '',
      duracion: '',
      vacantes: '',
      estado: '',
      publicadaPor: '',
      requisitos: '',
      descripcion: '',
      fechaPublicacion: new Date().toISOString(),
      id: this.generarIdUnico()
    };
  }

  private generarIdUnico(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}