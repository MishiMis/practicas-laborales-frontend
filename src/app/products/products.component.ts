import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarSeguimientoComponent } from '../componentes/agregar-seguimiento/agregar-seguimiento.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  usuarios: any[] = [];
  private readonly LOCAL_STORAGE_KEY = 'usuariosRegistrados';
    constructor(private dialog: MatDialog) {}


  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    const usuariosGuardados = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    this.usuarios = usuariosGuardados ? JSON.parse(usuariosGuardados) : [];
  }


  abrirModalAgregarUsuario(): void {
    const dialogRef = this.dialog.open(AgregarSeguimientoComponent, {
      width: '500px',
      panelClass: 'custom-dialog',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios();
      }
    });
  }

    eliminarUsuario(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.usuarios));
    }
  }

}
