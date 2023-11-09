from datetime import date, datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib import auth
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.request import Request
from bmstu_lab.models import Soft
from bmstu_lab.permissions import IsManager, IsAdmin
from bmstu_lab.serialaizers import SoftSerializer, PaymentSerializer, UserSerializer, LoginRequestSerializer
from bmstu_lab.models import Payment
from django.db.models import Q
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


import psycopg2

con = psycopg2.connect(
    database="test",
    user="postgres",
    password="mamaev2002",
    host="localhost",
    port="5432"
)

cur = con.cursor()

cur.execute("SELECT * FROM payment")

results = cur.fetchall()
print(results)




def index(request):
    return render(request, 'index.html',
                  {'current_date': date.today()})


def about(request):
    return render(request, 'about.html')




def sendText(request):
    input_text = request.POST['text']
    return render(request, 'Softs.html', {'data': {
        'current_date': date.today(),
        'Softs': Soft.objects.all(),
        'input_text': int(input_text)}})


class PaymentDateViewSet(APIView):
    def get(self, request):
        date_open = request.data['date_open']
        payments = Payment.objects.filter(date_open=date_open)
        print(payments.count())
        return Response({'count': payments.count()})


class SoftSearchViewSet(APIView):
    def get(self, request):
        query = self.request.GET.get('search')
        object_list = Soft.objects.filter(
            Q(name__icontains=query) | Q(address__icontains=query)
        )
        return Response(SoftSerializer(object_list, many=True).data)
class PaymentDateFilterViewSet(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        # data = self.request.data  # допустим передали username и password
        start = self.request.GET.get('start')
        start = datetime.strptime(start, "%Y-%m-%d")
        end = self.request.GET.get('end')
        end = datetime.strptime(end, "%Y-%m-%d")
        object_list = Payment.objects.filter(date_open__range=[start, end])
        return Response(PaymentSerializer(object_list, many=True).data)

class PaymentFilterViewSet(APIView):
    permission_classes = [IsManager]
    def get(self, request):
        query = self.request.GET.get('status')
        object_list = Payment.objects.filter(status=query)
        return Response(PaymentSerializer(object_list, many=True).data)

class PaymentByUserViewSet(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    def get(self, request):
        query = self.request.GET.get('user')
        payment_list = Payment.objects.filter(user=query)
        soft_list = payment_list[0].soft
        if (payment_list is not None) and (soft_list is not None):
            return Response({'payment' : PaymentSerializer(payment_list[0]).data, 'soft' : SoftSerializer(soft_list).data})
        else:
            return Response({'error': 'не работает'})


class SoftFilterViewSet(APIView):
    def get(self, request):
        query = self.request.GET.get('direction')
        if (query == 'up'):
            object_list = Soft.objects.all().order_by('price')
        elif (query == 'down'):
            object_list = Soft.objects.all().order_by('-price')
        return Response(SoftSerializer(object_list, many=True).data)


def DelSoft(request):
    input_id = request.POST['text']
    print(input_id)
    cur.execute(f"DELETE FROM soft WHERE id = {input_id}")
    con.commit()
    return render(request, 'Softs.html', {'data': {
        'current_date': date.today(),
        'Softs': Soft.objects.all()
    }})


con.close


def GetSofts(request):
    return render(request, 'Softs.html', {'data': {
        'current_date': date.today(),
        'Softs': Soft.objects.all()
    }})


def GetSoft(request, id):
    return render(request, 'Soft.html', {'data': {
        'current_date': date.today(),
        'Soft': Soft.objects.filter(id=id)[0]
    }})

@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']
        re_password = data['re_password']

        if password == re_password:
            if User.objects.filter(username=username).exists():
                return Response({'error': 'username is already taken'})
            else:
                user = User.objects.create_user(username=username, password=password)

                user = User.objects.get(id=user.id)

                login(request, user)
                return Response({'status': 'ok', 'IsAuthenticated': 'true', 'user_id' : user.id, "is_staff" : user.is_staff})
        
        else:
            return Response({'error': 'password do not match'})



class SoftViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [IsAuthenticatedOrReadOnly]
        elif self.action in ['create', 'destroy', 'update']:
            permission_classes = [IsManager]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]
    queryset = Soft.objects.all().order_by('id')
    serializer_class = SoftSerializer  # Сериализатор для модели



class PaymentViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action in ['create', 'list']:
            permission_classes = [IsAuthenticated]
        elif self.action == 'update':
            permission_classes = [IsManager]
        else:
            permission_classes = [IsAdmin]
        return [permission() for permission in permission_classes]
    queryset = Payment.objects.all().order_by('id_field')
    serializer_class = PaymentSerializer  # Сериализатор для модели

@method_decorator(csrf_protect, name='dispatch')
class Login(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        data = self.request.data # допустим передали username и password
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'status': 'ok', 'IsAuthenticated': 'true', 'user_id' : user.id, "is_staff" : user.is_staff})
        else:
            return Response({'status': 'error', 'error': 'login failed', 'IsAuthenticated': 'false'})


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            auth.logout(request)
            return Response({'success': 'logged out'})
        except:
            return Response({'error': 'error logging out'})

class ExampleView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': str(request.user),  # `django.contrib.auth.User` instance.
            'auth': str(request.auth),  # None
        }
        return Response(content)

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.csrf_token})


@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([BasicAuthentication])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })

