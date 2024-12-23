from django.db import models
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
import uuid

# Tabla Mesas
class Mesa(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    numero_mesa = models.IntegerField(unique=True)
    capacidad = models.IntegerField()
    estado = models.CharField(
        max_length=10,
        choices=[('disponible', 'Disponible'), ('ocupada', 'Ocupada'),('preparando', 'Preparando')],
        default='disponible'
    )
    pedidoencurso = models.CharField(max_length=36, null=True, blank=True)

    
    def __str__(self):
        return f"Mesa {self.numero_mesa}"

# Tabla Empleados
class Empleado(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    CARGOS = [
        ('mesero', 'Mesero'),
        ('cocinero', 'Cocinero'),
        ('supervisor', 'Supervisor'),
        ('administrador', 'Administrador'),
    ]
    nombre = models.CharField(max_length=100)
    cargo = models.CharField(max_length=50, choices=CARGOS)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    correo = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.nombre

# Tabla Menú
class Menu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre_plato = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre_plato

# Tabla Pedidos
class Pedido(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ESTADOS = [
        ('pendiente', 'Pendiente'),
        ('preparando', 'Preparando'),
        ('servido', 'Servido'),
    ]
    mesa = models.ForeignKey(Mesa, on_delete=models.CASCADE)
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='pendiente')

    def __str__(self):
        return f"Pedido {self.id} - Mesa {self.mesa.numero_mesa}"

# Tabla Detalles de Pedidos
class DetallePedido(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, to_field='id')
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.cantidad}x {self.menu.nombre_plato}"

# Tabla Inventario
class Inventario(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    UNIDAD_MEDIDA = [
        ('unidad', 'Unidad'),
        ('litro', 'Litro'),
        ('gramo', 'Gramo'),
        ('kg', 'Kilogramo'),
        ('ml', 'Mililitro'),
    ]
    nombre_producto = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    cantidad = models.IntegerField()
    unidad_medida = models.CharField(max_length=10, choices=UNIDAD_MEDIDA)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre_producto

# Tabla Usuarios
class Usuarios(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    TIPO_USUARIO = [
        ('mesero', 'Mesero'),
        ('cocinero', 'Cocinero'),
        ('supervisor', 'Supervisor'),
        ('administrador', 'Administrador'),
    ]
    empleado = models.OneToOneField(Empleado, on_delete=models.CASCADE)
    nombre_usuario = models.CharField(max_length=50, unique=True)
    contrasena = models.CharField(max_length=255)
    tipo_usuario = models.CharField(max_length=50, choices=TIPO_USUARIO)

    def __str__(self):
        return self.nombre_usuario
    
#tabla para relacionar menú con inventario en relación onetomany 
class IngredienteMenu(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    menu = models.ForeignKey('Menu', on_delete=models.CASCADE, related_name='ingredientes', to_field='id')  
    ingrediente = models.ForeignKey(Inventario, on_delete=models.CASCADE, related_name='menus', to_field='id')  
    cantidad_requerida = models.DecimalField(max_digits=10, decimal_places=2)  
    unidad_medida = models.CharField(
        max_length=10,
        choices=Inventario.UNIDAD_MEDIDA,  # Usa las mismas unidades de `Inventario`
        default='unidad'
    )

    def __str__(self):
        return f"{self.cantidad_requerida} {self.unidad_medida} de {self.ingrediente.nombre_producto} para {self.menu.nombre_plato}"


# Señales para actualizar estado de la mesa y descontar inventario
@receiver(post_save, sender=Pedido)
def actualizar_estado_mesa(sender, instance, **kwargs):
    if instance.estado == 'pendiente':
        mesa = instance.mesa
        mesa.estado = 'ocupada'
        mesa.save()

