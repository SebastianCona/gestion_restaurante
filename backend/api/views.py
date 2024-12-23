from django.shortcuts import render
from rest_framework import viewsets, status
from .models import Pedido, Mesa, Empleado, Inventario, DetallePedido, Usuarios, Menu, IngredienteMenu 
from .serializers import PedidoSerializer, MesaSerializer, EmpleadoSerializer, InventarioSerializer, DetallePedidoSerializer, UsuarioSerializer, MenuSerializer, IngredienteMenuSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.views import APIView
from rest_framework.response import Response


class MesaViewSet(viewsets.ModelViewSet):
    queryset = Mesa.objects.all()
    serializer_class = MesaSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer

class DetallePedidoViewSet(viewsets.ModelViewSet):
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer

class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuarioSerializer

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class IngredienteMenuViewSet(viewsets.ModelViewSet):
    queryset = IngredienteMenu.objects.all()
    serializer_class = IngredienteMenuSerializer
    
# Para obtener el token (login)
class MyTokenObtainPairView(TokenObtainPairView):
    pass

# Para refrescar el token
class MyTokenRefreshView(TokenRefreshView):
    pass

#actualización de estado de mesa
class ActualizarEstadoMesaView(APIView):
    def post(self, request, mesa_id):
        try:
            mesa = Mesa.objects.get(id=mesa_id)
            nuevo_estado = request.data.get('estado')
            if nuevo_estado not in ['disponible', 'ocupada']:
                return Response({'error': 'Estado no válido'}, status=status.HTTP_400_BAD_REQUEST)
            mesa.estado = nuevo_estado
            mesa.save()
            return Response(MesaSerializer(mesa).data, status=status.HTTP_200_OK)
        except Mesa.DoesNotExist:
            return Response({'error': 'Mesa no encontrada'}, status=status.HTTP_404_NOT_FOUND)

class MesaCreateView(APIView):
    def post(self, request):
        serializer = MesaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Guarda la mesa en la base de datos
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)