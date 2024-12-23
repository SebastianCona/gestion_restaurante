from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PedidoViewSet, MesaViewSet, EmpleadoViewSet, InventarioViewSet, DetallePedidoViewSet, UsuariosViewSet, MenuViewSet, IngredienteMenuViewSet, MyTokenObtainPairView, MyTokenRefreshView, ActualizarEstadoMesaView,MesaCreateView

#routers
router = DefaultRouter()
router.register(r'pedidos', PedidoViewSet)
router.register(r'mesas', MesaViewSet)
router.register(r'empleados', EmpleadoViewSet)
router.register(r'inventario', InventarioViewSet)
router.register(r'detalles_pedidos', DetallePedidoViewSet)
router.register(r'usuarios', UsuariosViewSet)
router.register(r'menu', MenuViewSet)
router.register(r'ingredientes_menu', IngredienteMenuViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # Incluye las rutas creadas por el router
    #otras rutas
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('mesas/<int:mesa_id>/actualizar-estado/', ActualizarEstadoMesaView.as_view(), name='actualizar_estado_mesa'), #ruta de actualización manual de estado de mesa
    path('api/mesas/', MesaCreateView.as_view(), name='mesa-create'),
    

]
router = DefaultRouter()
router.register(r'menu', MenuViewSet)

