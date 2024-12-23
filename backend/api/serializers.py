from rest_framework import serializers
from .models import Pedido, Mesa, Empleado, Inventario, DetallePedido, Usuarios, Menu, IngredienteMenu

class MesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mesa
        fields = ['id', 'numero_mesa', 'capacidad', 'estado'] 
        
class PedidoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pedido
        fields = '__all__'  
        
class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'

class DetallePedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallePedido
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', 'nombre_usuario', 'tipo_usuario']

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__' 

class IngredienteMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredienteMenu
        fields = '__all__'